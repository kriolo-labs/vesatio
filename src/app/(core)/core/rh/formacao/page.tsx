"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { cn } from "@/lib/utils";
import { mockPerformanceReviews, mockTrainingSessions, TrainingStatus } from "@/types/training";
import { Award, BookOpen, Clock, MoreVertical, Plus, Star, Target } from "lucide-react";
import Link from "next/link";

export default function TrainingPage() {
  const getTrainingStatusColor = (status: TrainingStatus) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "in_progress":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "completed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    }
  };

  const getTrainingStatusLabel = (status: TrainingStatus) => {
    switch (status) {
      case "scheduled":
        return "Agendado";
      case "in_progress":
        return "A Decorrer";
      case "completed":
        return "Concluído";
      case "cancelled":
        return "Cancelado";
    }
  };

  const StatusBadge = ({ status, type }: { status: string; type: "training" | "review" }) => {
    if (type === "training") {
      return (
        <Badge variant="outline" className={getTrainingStatusColor(status as TrainingStatus)}>
          {getTrainingStatusLabel(status as TrainingStatus)}
        </Badge>
      );
    }
    // Review Status
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="border-amber-500/20 bg-amber-500/10 text-amber-500">
            Pendente
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
          >
            Concluído
          </Badge>
        );
      case "acknowledged":
        return (
          <Badge variant="outline" className="border-blue-500/20 bg-blue-500/10 text-blue-500">
            Assinado
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Formação e Avaliações"
        description="Desenvolvimento de competências e gestão de desempenho."
      >
        <div className="flex gap-2">
          <Link
            href="/core/rh/formacao/avaliacoes"
            className={cn(buttonVariants({ variant: "outline" }), "border-white/10 text-diamond")}
          >
            <Target className="mr-2 h-4 w-4" /> Avaliar Equipa
          </Link>
          <Link
            href="/core/rh/formacao/nova"
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-gold text-onyx hover:bg-gold/90"
            )}
          >
            <Plus className="mr-2 h-4 w-4" /> Agendar Formação
          </Link>
        </div>
      </PageHeader>

      {/* Evaluations Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-white/5 bg-onyx-900 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="text-gold" />
              As Minhas Avaliações
            </CardTitle>
            <CardDescription>Consulte o feedback recebido e os seus objetivos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockPerformanceReviews
              .filter((r) => r.employeeId === "EMP-001")
              .map((review) => (
                <div key={review.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-lg text-white">{review.cycle}</h3>
                      <p className="text-sm text-diamond-muted">
                        Avaliador: {review.reviewerName} •{" "}
                        {new Date(review.date).toLocaleDateString("pt-PT")}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center rounded border border-white/10 bg-onyx-900 px-3 py-1.5">
                        <Star className="mr-2 h-4 w-4 fill-gold text-gold" />
                        <span className="font-bold text-white">{review.rating.toFixed(1)}</span>
                      </div>
                      <StatusBadge status={review.status} type="review" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-diamond">
                        Feedback
                      </h4>
                      <p className="text-sm italic text-diamond-muted">"{review.feedback}"</p>
                    </div>
                    <div>
                      <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-diamond">
                        Objetivos
                      </h4>
                      <ul className="list-inside list-disc space-y-1 text-sm text-diamond-muted">
                        {review.goals?.map((goal, idx) => (
                          <li key={idx}>{goal}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>

        {/* KPI / Quick Stats */}
        <div className="space-y-6">
          <Card className="border-white/5 bg-onyx-900 bg-gradient-to-br from-gold/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-gold">
                Média Global da Equipa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 font-serif text-4xl text-white">4.2</div>
              <div className="flex text-sm text-gold">
                <Star className="h-4 w-4 fill-gold" />
                <Star className="h-4 w-4 fill-gold" />
                <Star className="h-4 w-4 fill-gold" />
                <Star className="h-4 w-4 fill-gold" />
                <Star className="h-4 w-4 text-white/20" />
              </div>
              <p className="mt-4 text-xs text-diamond-muted">
                Baseado em 24 avaliações (Ciclo 2023)
              </p>
            </CardContent>
          </Card>

          <Card className="border-white/5 bg-onyx-900">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-emerald-500">
                Horas de Formação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-1 font-serif text-4xl text-white">128h</div>
              <p className="text-xs text-diamond-muted">Total acumulado este ano</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Training Calendar List */}
      <Card className="border-white/5 bg-onyx-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="text-blue-400" />
            Plano de Formação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTrainingSessions.map((session) => (
              <div
                key={session.id}
                className="flex flex-col items-start justify-between gap-4 rounded-lg border border-white/5 bg-white/5 p-4 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-lg border border-white/10 bg-onyx-800 text-white">
                    <span className="text-xs font-bold uppercase">
                      {new Date(session.date)
                        .toLocaleDateString("pt-PT", { month: "short" })
                        .replace(".", "")}
                    </span>
                    <span className="font-serif text-xl">{new Date(session.date).getDate()}</span>
                  </div>
                  <div>
                    <h4 className="text-base font-medium text-white">{session.title}</h4>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-diamond-muted">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {session.startTime} ({session.duration / 60}h)
                      </div>
                      <span>•</span>
                      <span>{session.location}</span>
                      <span>•</span>
                      <span>Formador: {session.trainer}</span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
                  <div className="mr-2 hidden text-right sm:block">
                    <div className="mb-1 text-xs text-diamond-muted">Inscritos</div>
                    <div className="text-sm font-medium text-white">
                      {session.attendees.length} / {session.capacity}
                    </div>
                  </div>
                  <StatusBadge status={session.status} type="training" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-diamond-muted hover:text-white"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
