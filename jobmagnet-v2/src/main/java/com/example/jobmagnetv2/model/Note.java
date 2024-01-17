package com.example.jobmagnetv2.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Embeddable
public class Note {
    private String content;
    private String image;
    private String replyTo;
    private String timestamp;
    private String type;
}
