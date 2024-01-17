package com.example.jobmagnetv2.model.keycloak;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AccessToken {
  @JsonProperty("access_token")
  private String accessToken;

  @JsonProperty("expires_in")
  private int expireTime;

  @JsonProperty("token_type")
  private String tokenType;
}
