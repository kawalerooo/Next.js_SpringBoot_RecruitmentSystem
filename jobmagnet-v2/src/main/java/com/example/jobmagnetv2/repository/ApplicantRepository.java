package com.example.jobmagnetv2.repository;

import com.example.jobmagnetv2.model.ApplicantForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicantRepository extends JpaRepository<ApplicantForm, Long> {}
