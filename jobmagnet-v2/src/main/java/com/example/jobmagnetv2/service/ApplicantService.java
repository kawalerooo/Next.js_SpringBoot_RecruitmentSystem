package com.example.jobmagnetv2.service;

import com.example.jobmagnetv2.model.ApplicantForm;
import com.example.jobmagnetv2.repository.ApplicantRepository;
import org.springframework.stereotype.Service;

@Service
public class ApplicantService {
  private final ApplicantRepository applicantRepository;

  public ApplicantService(ApplicantRepository applicantRepository) {
    this.applicantRepository = applicantRepository;
  }

  public ApplicantForm updateApplicantForm(ApplicantForm applicantForm) {
    return applicantRepository.save(applicantForm);
  }

  public ApplicantForm getApplicantForm(Long id) {
    return applicantRepository
        .findById(id)
        .orElseThrow(() -> new RuntimeException("Applicant not found"));
  }
}
