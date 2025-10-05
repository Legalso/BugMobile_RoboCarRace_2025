#include <Servo.h>

// Pins
#define TRIG_PIN 9      // Trigger do ultrassônico
#define ECHO_PIN 10     // Echo do ultrassônico
#define SERVO_PIN 6     // Servo motor 9g SG90

// Driver L293D - Motores
#define MOTOR_FL 2
#define MOTOR_FR 3
#define MOTOR_RL 4
#define MOTOR_RR 5
#define REV_FL 7
#define REV_FR 8
#define REV_RL 11
#define REV_RR 12

#define SOUND_SPEED 0.034029   // Velocidade do som em cm/us
#define MIN_DISTANCE 25        // Distância mínima de segurança (cm)

Servo scanServo;

void setup() {
  Serial.begin(9600);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  int motorPins[] = {MOTOR_FL, MOTOR_FR, MOTOR_RL, MOTOR_RR, REV_FL, REV_FR, REV_RL, REV_RR};
  for (int i = 0; i < 8; i++) {
    pinMode(motorPins[i], OUTPUT);
    digitalWrite(motorPins[i], LOW);
  }

  scanServo.attach(SERVO_PIN);
  scanServo.write(90);  // posição central
  delay(500);

  stopMotors();
  Serial.println("Carro Autônomo - Desvia obstáculos v1.0");
}

// Loop principal
void loop() {
  // Faz scan em três pontos: esquerda, frente e direita
  float leftDist  = scanAt(150);  // esquerda
  float frontDist = scanAt(90);   // frente
  float rightDist = scanAt(30);   // direita

  Serial.print("Esquerda: "); Serial.print(leftDist); Serial.print(" cm | ");
  Serial.print("Frente: "); Serial.print(frontDist); Serial.print(" cm | ");
  Serial.print("Direita: "); Serial.print(rightDist); Serial.println(" cm");

  // Lógica de movimento baseada no scan
  if (frontDist > MIN_DISTANCE) {
    moveForward();
  } else if (leftDist > rightDist) {
    turnLeft();
  } else {
    turnRight();
  }

  delay(200);
}

// Scan em um ângulo específico
float scanAt(int angle) {
  scanServo.write(angle);
  delay(200);  // espera o servo estabilizar
  return getDistance();
}

// Medir distância
float getDistance() {
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  long duration = pulseIn(ECHO_PIN, HIGH, 20000);
  if (duration == 0) return 999; // nada detectado

  float distance = duration * SOUND_SPEED / 2.0;
  return distance;
}

// Controle dos motores
void moveForward() {
  Serial.println("FORWARD");
  setMotors(HIGH, HIGH, HIGH, HIGH, LOW, LOW, LOW, LOW);
  delay(200);
  stopMotors();
}

void moveReverse() {
  Serial.println("REVERSE");
  setMotors(LOW, LOW, LOW, LOW, HIGH, HIGH, HIGH, HIGH);
  delay(300);
  stopMotors();
}

void turnLeft() {
  Serial.println("LEFT");
  setMotors(HIGH, LOW, HIGH, LOW, LOW, HIGH, LOW, HIGH);
  delay(300);
  stopMotors();
}

void turnRight() {
  Serial.println("RIGHT");
  setMotors(LOW, HIGH, LOW, HIGH, HIGH, LOW, HIGH, LOW);
  delay(300);
  stopMotors();
}

void stopMotors() {
  setMotors(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW);
}

void setMotors(
  int fl, int fr, int rl, int rr,
  int rev_fl, int rev_fr, int rev_rl, int rev_rr
) {
  digitalWrite(MOTOR_FL, fl);
  digitalWrite(MOTOR_FR, fr);
  digitalWrite(MOTOR_RL, rl);
  digitalWrite(MOTOR_RR, rr);
  digitalWrite(REV_FL, rev_fl);
  digitalWrite(REV_FR, rev_fr);
  digitalWrite(REV_RL, rev_rl);
  digitalWrite(REV_RR, rev_rr);
}
