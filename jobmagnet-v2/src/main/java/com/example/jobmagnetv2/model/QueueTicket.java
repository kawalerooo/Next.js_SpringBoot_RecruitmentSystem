package com.example.jobmagnetv2.model;

import com.example.jobmagnetv2.model.enums.QueuePriority;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class QueueTicket {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private QueuePriority priority;

  @ElementCollection
  @CollectionTable(name = "notes", joinColumns = @JoinColumn(name = "id"))
  @Column(name = "notes")
  private List<Note> notes;
}
