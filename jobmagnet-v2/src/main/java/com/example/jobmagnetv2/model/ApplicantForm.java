package com.example.jobmagnetv2.model;

import com.example.jobmagnetv2.model.enums.ApplicantFormEducation;
import com.example.jobmagnetv2.model.enums.ApplicantFormJobStart;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.*;


import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class ApplicantForm {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String firstName;
  private String lastName;
  private String username;
  private String email;
  private String phone;
  private ApplicantFormEducation education;
  private ApplicantFormJobStart jobStart;
  private Integer expectedSalary;
  private LocalDate applicationDate;
  private String status;

  @OneToOne(cascade = CascadeType.ALL)
  private QueueTicket queueTicket;
}
