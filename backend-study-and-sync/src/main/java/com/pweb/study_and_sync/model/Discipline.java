package com.pweb.study_and_sync.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tb_discipline")
public class Discipline {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne 
    @JoinColumn(name = "teacher_id", nullable = false) 
    private Teacher teacher; 

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    @Column(length = 20)
    private String color;

    @Column(nullable = false)
    private LocalDateTime creationDate;

    @ManyToMany
    @JoinTable(
        name = "aluno_curso", 
        joinColumns = @JoinColumn(name = "student_id"), 
        inverseJoinColumns = @JoinColumn(name = "discipline_id")  
    )
    private Set<Student> students = new HashSet<>();
    // no fundo, todo professor também é um estudante

    public Discipline() {}

    public Discipline(Teacher teacher, String name, String description, String color, LocalDateTime creationDate) {
        this.teacher = teacher;
        this.name = name;
        this.description = description;
        this.color = color;
        this.creationDate = creationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacherId(Teacher teacher) {
        this.teacher = teacher;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    @Override
    public String toString() {
        return "Discipline{" +
                "id=" + id +
                ", teacher=" + teacher +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", color='" + color + '\'' +
                ", creationDate=" + creationDate +
                '}';
    }
}
