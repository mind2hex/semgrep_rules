// ruleid: java-pattern-353-Lack-of-Data-Validation-Token
String payload = new String(Base64.getDecoder().decode(JWT.decode(authorization).getPayload()));
