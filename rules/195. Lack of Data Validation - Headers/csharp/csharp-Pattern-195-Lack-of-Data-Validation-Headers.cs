// EXAMPLE 1
public string GetClientIpAddress()
{
    var context = HttpContext.Current;
    string ipAddress = context.Request.UserHostAddress;
    // ruleid: csharp-pattern-195-Lack-of-Data-Validation-Headers
    var forwardedFor = context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
    if (!string.IsNullOrEmpty(forwardedFor))
    {
        ipAddress = forwardedFor.Split(',')[0];
    }
    // SNIP 
    ipAddress = RemovePortFromIp(ipAddress);
    return ipAddress;
}