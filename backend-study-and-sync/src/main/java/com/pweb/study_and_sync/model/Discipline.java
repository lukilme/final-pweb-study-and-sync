package com.pweb.study_and_sync.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "tb_discipline")
public class Discipline {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    @JsonBackReference 
    private Teacher teacher;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String description;

    @Column(length = 20)
    private String color;

    @Column(nullable = false)
    private LocalDateTime creationDate;


    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "discipline_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    @JsonManagedReference("discipline-student")
    private Set<Student> students = new HashSet<>();

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

    public void setTeacher(Teacher teacher){
        this.teacher = teacher;
    }
    
    public void addStudent(Student newStudent){
        this.students.add(newStudent);
    }

    public Student removeStudent(Student removedStudent){
        this.students.remove(removedStudent);
        return removedStudent;
    }

    public Set<Student> getStudents(){
        return this.students;
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
