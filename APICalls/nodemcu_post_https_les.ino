#include "DHT.h"
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

class SensorData {
  public:
    SensorData(const char* ssid, const char* password) {
      this->ssid = ssid;
      this->password = password;
      WiFi.begin(this->ssid, this->password);
      
      pinMode(Led1, OUTPUT);
      pinMode(Led2, OUTPUT);
      pinMode(Led3, OUTPUT);
      pinMode(LDR_In, INPUT);
            
      if(serverProtocol.length() > 0) URL += serverProtocol;
      URL += serverIP;
      if(serverDirectory.length() > 0) URL += "/" + serverDirectory;
    }

    void wifiConnect() {
      Serial.print("Connecting to WiFi...");
      while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
      }
      Serial.println(" connected");
      Serial.print("    IP address: ");
      Serial.println(WiFi.localIP());
    }

    void setLedStatus()
    {
      int maxLDR = 260;
      
      int threshold1 = (int)(0.75 * maxLDR);
      int threshold2 = (int)(0.5 * maxLDR);
      int threshold3 = (int)(0.25 * maxLDR);
      
      LHH = analogRead(LDR_In);
      float percentage = (float)LHH / (float)maxLDR * 100.0;
    
      if (percentage <= threshold1) {
        digitalWrite(Led1, HIGH);
        digitalWrite(Led2, LOW);
        digitalWrite(Led3, LOW);
        led1status = HIGH;
        led2status = LOW;
        led3status = LOW;
      } else if (percentage <= threshold2) {
        digitalWrite(Led1, LOW);
        digitalWrite(Led2, HIGH);
        digitalWrite(Led3, LOW);
        led1status = LOW;
        led2status = HIGH;
        led3status = LOW;
      } else if (percentage <= threshold3) {
        digitalWrite(Led1, LOW);
        digitalWrite(Led2, LOW);
        digitalWrite(Led3, HIGH);
        led1status = LOW;
        led2status = LOW;
        led3status = HIGH;
      } else {
        digitalWrite(Led1, LOW);
        digitalWrite(Led2, LOW);
        digitalWrite(Led3, LOW);
        led1status = LOW;
        led2status = LOW;
        led3status = LOW;
      }
    }

    void readDHT11(){
      temperature = round(dht.readTemperature()*10)/10; 
      humidity = round(dht.readHumidity()*10)/10; 
      heatindex = round(dht.computeHeatIndex(temperature, humidity, false)*10)/10;
        
      if(isnan(temperature) || isnan(humidity) || isnan(heatindex)){
        Serial.println("DHT11 sensor error");
      }
      else{
        Serial.print("Temp. ");
        Serial.println(temperature);
        Serial.print("C. Humidity  ");
        Serial.println(humidity);
        Serial.print("% Heatindex ");
        Serial.println(heatindex);
      }
    }
    
    void setLDR(){
      LHH = analogRead(LDR_In);
      Serial.println("Light Intensity: " + String(LHH));
    }

    void generateJson(){
      setLedStatus();
      setLDR();
      doc["Temperature"] = temperature;
      doc["Humidity"] = humidity;
      doc["HeatIndex"] = heatindex;
      doc["Led1"] = led1status;
      doc["Led2"] = led2status;
      doc["Led3"] = led3status;
      doc["Licht"] = LHH;
      serializeJson(doc, jsonOut);
    }

    void SendPOST() {
      WiFiClientSecure client;
      client.setFingerprint(fingerprint);
      HTTPClient https;
      
      if( https.begin(client, URL) ){
        https.addHeader("Content-Type", "application/json");
        int responseCode = https.POST(jsonOut);
        String responseMsg = https.getString();
        Serial.print("[HTTPS] POST code: ");
        Serial.print(responseCode);
        Serial.print("\n[HTTPS] Response: ");
        Serial.println(responseMsg);
        https.end();
      }
      else
      {
        Serial.println("[HTTPS] Unable to connect");
      }
    }

    const char* getSSID() {
      return ssid;
    }

    const char* getURL() {
      return URL.c_str();
    }

    const char* getJSON() {
      return jsonOut;
    }

  private:
    // DHT11 sensor
    #define DHTTYPE DHT11       
    uint8_t DHTPin = D7;        
    DHT dht{DHTPin, DHTTYPE};   
    float temperature;         
    float humidity;            
    float heatindex;           
    
    // LED pins and status
    int LDR_In = A0;
    uint8_t Led1 = D3;
    uint8_t Led2 = D5;
    uint8_t Led3 = D6;
    int led1status = LOW;
    int led2status = LOW;
    int led3status = LOW;
    int LHH;
    
    const char* ssid;
    const char* password;
    
    const String serverProtocol = "https://";
    const String serverIP = "35023.hosts1.ma-cloud.nl";
    const String serverDirectory = "duurzaamhuis/post.php";
    String URL;
    const uint8_t fingerprint[20] = {0x69, 0x9C, 0x11, 0xAF, 0x88, 0xB4, 0xD9, 0x10, 0x5E, 0x9B, 0xD7, 0x76, 0xE7, 0xB1, 0xD8, 0x1D, 0xD9, 0x62, 0x09, 0xEE}; // fingerprint van jou server

    // JSON
    static const int capacity = JSON_OBJECT_SIZE(7);
    StaticJsonDocument<capacity> doc;
    char jsonOut[256];
};

void setup() {
  Serial.begin(115200);
  SensorData sensorData = SensorData("Ziggo4190322", "qbrh5fvTnmtr");
  Serial.print("\r\nConnected: SSID: "); 
  Serial.print(sensorData.getSSID());
  Serial.print("    IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("HTTP server started");
  Serial.println(String("\nSending POST data to: ") + sensorData.getURL() + "\n");
}

void loop() {
  SensorData sensorData = SensorData("Ziggo4190322", "qbrh5fvTnmtr");
  if(WiFi.status() != WL_CONNECTED) sensorData.wifiConnect();
  sensorData.readDHT11();
  delay(7500);
  sensorData.generateJson();
  Serial.println(sensorData.getJSON());
  delay(7500);
  sensorData.SendPOST();
  delay(7500);
}
