// EXAMPLE 1:
@RequestMapping(value = "/infos/{id}", method = RequestMethod.GET)
public String loadInfoDataByID(@PathVariable("id") Long id, Model model) {
    // ruleid: java-tainted-013-insecure-object-reference
    Info byId = infoRepository.getById(id);
    model.addAttribute("info", byId);
    return "/infos";
}