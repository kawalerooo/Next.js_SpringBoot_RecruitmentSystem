package com.example.jobmagnetv2.controller;

import com.example.jobmagnetv2.model.ApplicantForm;
import com.example.jobmagnetv2.model.CompanyAd;
import com.example.jobmagnetv2.service.CompanyAdService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/companyAd")
@CrossOrigin
public class CompanyAdController {
  private final CompanyAdService companyAdService;

  public CompanyAdController(CompanyAdService companyAdService) {
    this.companyAdService = companyAdService;
  }

  @PostMapping
  public CompanyAd addCompanyAd(@RequestBody CompanyAd companyAd) {
    return companyAdService.saveCompanyAd(companyAd);
  }

  @GetMapping("/all")
  public Iterable<CompanyAd> getAllCompanyAds() {
    return companyAdService.getAllCompanyAds();
  }

  @GetMapping
  public CompanyAd getCompanyAdById(@RequestParam Long id) {
    return companyAdService.getCompanyAdById(id);
  }

  @DeleteMapping
  public boolean deleteCompanyAdById(@RequestParam Long id) {
    return companyAdService.deleteCompanyAdById(id);
  }

  @PutMapping
  public CompanyAd updateCompanyAd(@RequestBody CompanyAd companyAd) {
    return companyAdService.updateCompanyAd(companyAd);
  }

  @PutMapping("/addApplicant")
  public ApplicantForm addApplicant(
      @RequestBody ApplicantForm applicantForm, @RequestParam Long companyAdId) {
    return companyAdService.addApplicant(applicantForm, companyAdId);
  }
}
