// EXAMPLE 1
@GetMapping("/redirect")
public String redirectPage(HttpServletRequest request) {
    String paramName = request.getParameter("uri");
    if (paramName == null || paramName == "") {
        return "redirect:/";
    }
    // ruleid: java-tainted-156-uncontrolled-external-site-redirect
    return "redirect:" + paramName;
}