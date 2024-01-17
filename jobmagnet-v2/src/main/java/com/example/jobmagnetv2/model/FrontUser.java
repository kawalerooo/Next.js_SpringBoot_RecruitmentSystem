package com.example.jobmagnetv2.model;

import com.example.jobmagnetv2.model.keycloak.PostUser;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class FrontUser {
  @JsonProperty("kcuser")
  private PostUser postUser;

  @JsonProperty("userdata")
  private User user;
}
