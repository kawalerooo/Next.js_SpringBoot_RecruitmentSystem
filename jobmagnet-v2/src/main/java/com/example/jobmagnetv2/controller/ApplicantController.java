package com.example.jobmagnetv2.controller;

import com.example.jobmagnetv2.model.ApplicantForm;
import com.example.jobmagnetv2.service.ApplicantService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/applicant")
@CrossOrigin
public class ApplicantController {
  private final ApplicantService applicantService;

  public ApplicantController(ApplicantService applicantService) {
    this.applicantService = applicantService;
  }

  @PutMapping
  public ApplicantForm updateApplicantForm(@RequestBody ApplicantForm applicantForm) {
    return applicantService.updateApplicantForm(applicantForm);
  }

  @GetMapping
  public ApplicantForm getApplicantForm(@RequestParam Long id) {
    return applicantService.getApplicantForm(id);
  }
}
