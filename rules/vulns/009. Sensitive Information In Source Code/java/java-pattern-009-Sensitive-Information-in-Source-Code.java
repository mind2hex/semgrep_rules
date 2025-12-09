// EXAMPLE 1
public class TokenFilter implements HandlerInterceptor {
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
      throws BaseException {
    JWTVerifier jwtVerifier;
    try {
      jwtVerifier =
          // ruleid: java-pattern-009-Sensitive-Information-in-Source-Code
          JWT.require(Algorithm.HMAC256("IOTDB:" + InetAddress.getLocalHost().getHostAddress()))
              .build();
    } catch (UnknownHostException e) {
      e.printStackTrace();
      throw new BaseException(ErrorCode.SET_JWT_FAIL, ErrorCode.SET_JWT_FAIL_MSG);
    }
    try {
      String authorization = request.getHeader("Authorization");
      jwtVerifier.verify(authorization);
    } catch (Exception e) {
      e.printStackTrace();
      throw new BaseException(ErrorCode.TOKEN_ERR, ErrorCode.TOKEN_ERR_MSG);
    }
    return true;
  }
}

// EXAMPLE 2
public class JJwtTool {
  // ruleid: java-pattern-009-Sensitive-Information-in-Source-Code
  private static String secret =
      "HSyJ0eXAiOiJKV1QasdfffffffSd3g8923402347523fffasdfasgwaegwaegawegawegawegawetwgewagagew"
          + "asdf23r23DEEasdfawef134t2fawt2g325gafasdfasdfiLCJhbGciOiJIUzI1NiJ9";
}
