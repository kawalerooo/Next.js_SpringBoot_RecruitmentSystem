package com.example.jobmagnetv2.model.keycloak;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PostUser {
  private String username;
  private boolean enabled;
  private List<Credential> credentials;
  private List<String> requiredActions;
  private List<String> realmRoles;
}
