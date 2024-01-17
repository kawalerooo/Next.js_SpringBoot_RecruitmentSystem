package com.example.jobmagnetv2.model;

import com.example.jobmagnetv2.model.enums.JobContractType;
import com.example.jobmagnetv2.model.enums.JobDimension;
import com.example.jobmagnetv2.model.enums.JobPosition;
import com.example.jobmagnetv2.model.enums.JobType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class CompanyAd {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;
  private String tasks;
  private String requirements;
  private String benefits;

  @ElementCollection
  @CollectionTable(name = "job_position", joinColumns = @JoinColumn(name = "id"))
  private List<JobPosition> jobPosition = new ArrayList<>();

  @ElementCollection
  @CollectionTable(name = "job_contract_type", joinColumns = @JoinColumn(name = "id"))
  private List<JobContractType> jobContractType = new ArrayList<>();

  @ElementCollection
  @CollectionTable(name = "job_dimension", joinColumns = @JoinColumn(name = "id"))
  private List<JobDimension> jobDimension = new ArrayList<>();

  @ElementCollection
  @CollectionTable(name = "job_type", joinColumns = @JoinColumn(name = "id"))
  private List<JobType> jobType = new ArrayList<>();

  private boolean showFirstName;
  private boolean showLastName;
  private boolean showEmail;
  private boolean showPhone;
  private boolean showCV;
  private boolean showEducation;
  private boolean showAvailability;
  private boolean showSalaryExpectation;

  @OneToMany private List<ApplicantForm> applicants = new ArrayList<>();
}
