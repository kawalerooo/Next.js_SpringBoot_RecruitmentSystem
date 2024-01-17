package com.example.jobmagnetv2.model.keycloak;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Credential {
  private String value;
  private String type;
  private boolean temporary;
}
