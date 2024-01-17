package com.example.jobmagnetv2.service;

import com.example.jobmagnetv2.model.ApplicantForm;
import com.example.jobmagnetv2.model.CompanyAd;
import com.example.jobmagnetv2.repository.ApplicantRepository;
import com.example.jobmagnetv2.repository.CompanyAdRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@Service
public class CompanyAdService {
  private final CompanyAdRepository companyAdRepository;
  private final ApplicantRepository applicantRepository;

  public CompanyAdService(
      CompanyAdRepository companyAdRepository, ApplicantRepository applicantRepository) {
    this.companyAdRepository = companyAdRepository;
    this.applicantRepository = applicantRepository;
  }

  public CompanyAd saveCompanyAd(CompanyAd companyAd) {
    return companyAdRepository.save(companyAd);
  }

  public CompanyAd getCompanyAdById(Long id) {
    return companyAdRepository.findById(id).orElse(null);
  }

  public boolean deleteCompanyAdById(Long id) {
    companyAdRepository.deleteById(id);
    return true;
  }

  public List<CompanyAd> getAllCompanyAds() {
    return companyAdRepository.findAll();
  }

  public CompanyAd updateCompanyAd(CompanyAd companyAd) {
    return companyAdRepository.save(companyAd);
  }

  public ApplicantForm addApplicant(ApplicantForm applicantForm, Long companyAdId) {
    CompanyAd companyAd =
        companyAdRepository.findAll().stream()
            .filter(ad -> ad.getId().equals(companyAdId))
            .findFirst()
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ad not found"));

    if (applicantForm != null) {
      var applicant = applicantRepository.save(applicantForm);
      companyAd.getApplicants().add(applicant);
      companyAdRepository.save(companyAd);
      return applicant;
    } else {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Applicant form is null");
    }
  }
}
