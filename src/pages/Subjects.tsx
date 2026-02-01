import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { subjects, getDaysUntilExam } from "@/data/mockData";
import { Plus, Calendar, Trophy, BookOpen, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function SubjectCard({ subject, index }: { subject: typeof subjects[0]; index: number }) {
  const navigate = useNavigate();
  const daysLeft = getDaysUntilExam(subject.examDate);
  const totalTopics = subject.topics.length;
  const completedTopics = subject.topics.filter((t) => t.status === "revised").length;

  return (
    <Card
      className="card-hover cursor-pointer animate-fade-in overflow-hidden group"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => navigate(`/subjects/${subject.id}`)}
    >
      {/* Color bar */}
      <div className="h-2" style={{ backgroundColor: subject.color }} />

      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{subject.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {totalTopics} topics • {completedTopics} completed
            </p>
          </div>
          <Badge
            variant={daysLeft <= 3 ? "destructive" : daysLeft <= 7 ? "secondary" : "outline"}
            className={cn(
              "font-semibold",
              daysLeft <= 3 && "animate-pulse"
            )}
          >
            {daysLeft} days left
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Ring */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-muted/30"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke={subject.color}
                strokeWidth="6"
                strokeDasharray={`${(subject.progress / 100) * 176} 176`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold">{subject.progress}%</span>
            </div>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span>Exam: {new Date(subject.examDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="w-4 h-4 text-primary" />
              <span className="font-medium text-primary">{subject.xpEarned} XP</span>
            </div>
          </div>
        </div>

        {/* Topic Status */}
        <div className="flex items-center gap-2">
          {subject.topics.map((topic) => (
            <div
              key={topic.id}
              className={cn(
                "w-2 h-2 rounded-full",
                topic.status === "revised" && "bg-success",
                topic.status === "learning" && "bg-warning",
                topic.status === "new" && "bg-muted"
              )}
              title={`${topic.name} - ${topic.status}`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-sm text-muted-foreground">View topics</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function Subjects() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Subjects</h1>
          <p className="text-muted-foreground mt-1">
            Manage your subjects and track progress
          </p>
        </div>
        <Button onClick={() => navigate("/subjects/add")} className="gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Add Subject</span>
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary">{subjects.length}</div>
          <div className="text-sm text-muted-foreground">Active Subjects</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-success">
            {subjects.reduce((acc, s) => acc + s.topics.filter((t) => t.status === "revised").length, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Topics Revised</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-xp">
            {subjects.reduce((acc, s) => acc + s.xpEarned, 0)}
          </div>
          <div className="text-sm text-muted-foreground">Total XP</div>
        </Card>
      </div>

      {/* Subject Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <SubjectCard key={subject.id} subject={subject} index={index} />
        ))}

        {/* Add Subject Card */}
        <Card
          className="card-hover cursor-pointer border-dashed border-2 flex items-center justify-center min-h-[280px] animate-fade-in"
          style={{ animationDelay: `${subjects.length * 100}ms` }}
          onClick={() => navigate("/subjects/add")}
        >
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold">Add New Subject</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create a smart study plan
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
