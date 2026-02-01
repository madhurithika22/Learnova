import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { subjects, getDaysUntilExam } from "@/data/mockData";
import {
  ArrowLeft,
  Calendar,
  Trophy,
  Star,
  Clock,
  Brain,
  Edit,
} from "lucide-react";
import { cn } from "@/lib/utils";

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            "w-4 h-4",
            star <= difficulty
              ? "text-warning fill-warning"
              : "text-muted-foreground/30"
          )}
        />
      ))}
    </div>
  );
}

export default function SubjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const subject = subjects.find((s) => s.id === id);

  if (!subject) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Subject not found</h2>
        <Button variant="link" onClick={() => navigate("/subjects")}>
          Back to Subjects
        </Button>
      </div>
    );
  }

  const daysLeft = getDaysUntilExam(subject.examDate);
  const statusColors = {
    new: { bg: "bg-info/10", text: "text-info", label: "New" },
    learning: { bg: "bg-warning/10", text: "text-warning", label: "Learning" },
    revised: { bg: "bg-success/10", text: "text-success", label: "Revised" },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="animate-fade-in">
        <Button variant="ghost" onClick={() => navigate("/subjects")} className="gap-2 mb-4">
          <ArrowLeft className="w-4 h-4" />
          Back to Subjects
        </Button>

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: subject.color }}
              />
              <h1 className="text-2xl md:text-3xl font-bold">{subject.name}</h1>
            </div>
            <p className="text-muted-foreground mt-1">
              {subject.topics.length} topics • {subject.progress}% complete
            </p>
          </div>
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-urgent/10">
              <Calendar className="w-5 h-5 text-urgent" />
            </div>
            <div>
              <div className="text-2xl font-bold">{daysLeft}</div>
              <div className="text-xs text-muted-foreground">Days Left</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Brain className="w-5 h-5 text-success" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {subject.topics.filter((t) => t.status === "revised").length}
              </div>
              <div className="text-xs text-muted-foreground">Revised</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{subject.xpEarned}</div>
              <div className="text-xs text-muted-foreground">XP Earned</div>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <div className="text-2xl font-bold">
                {subject.topics.filter((t) => t.status === "learning").length}
              </div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Progress */}
      <Card className="animate-fade-in" style={{ animationDelay: "150ms" }}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium">Overall Progress</span>
            <span className="font-bold text-primary">{subject.progress}%</span>
          </div>
          <Progress value={subject.progress} className="h-3" />
        </CardContent>
      </Card>

      {/* Topics List */}
      <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
        <CardHeader>
          <CardTitle className="text-lg">Topics</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {subject.topics.map((topic, index) => (
              <div
                key={topic.id}
                className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors animate-slide-in-left"
                style={{ animationDelay: `${200 + index * 50}ms` }}
              >
                <div
                  className={cn(
                    "w-3 h-3 rounded-full",
                    topic.status === "revised" && "bg-success",
                    topic.status === "learning" && "bg-warning",
                    topic.status === "new" && "bg-info"
                  )}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{topic.name}</span>
                    {topic.aiDifficultyEstimate && (
                      <Badge variant="outline" className="text-xs">
                        AI estimated
                      </Badge>
                    )}
                  </div>
                  {topic.lastStudied && (
                    <p className="text-sm text-muted-foreground">
                      Last studied: {new Date(topic.lastStudied).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <DifficultyStars difficulty={topic.difficulty} />

                <Badge
                  variant="outline"
                  className={cn(
                    statusColors[topic.status].bg,
                    statusColors[topic.status].text,
                    "border-0"
                  )}
                >
                  {statusColors[topic.status].label}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insight */}
      <Card className="border-primary/20 bg-primary/5 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary text-primary-foreground">
              <Brain className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">AI Scheduling Note</h3>
              <p className="text-muted-foreground text-sm">
                Topics with higher difficulty are scheduled during your peak focus hours.
                The harder the topic + closer the exam = higher priority in your schedule.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
