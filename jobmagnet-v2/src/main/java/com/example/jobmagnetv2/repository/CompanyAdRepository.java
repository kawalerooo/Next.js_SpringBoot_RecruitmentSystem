package com.example.jobmagnetv2.repository;

import com.example.jobmagnetv2.model.CompanyAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyAdRepository extends JpaRepository<CompanyAd, Long> {
}
