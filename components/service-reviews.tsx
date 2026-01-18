"use client"

import { Star, CheckCircle2, Clock, Quote } from "lucide-react"

interface Review {
  name: string
  location: string
  rating: number
  date?: string
  text?: string
  comment?: string
  service: string
  verified: boolean
}

interface ServiceReviewsProps {
  service?: string
  reviews: Review[]
}

export function ServiceReviews({ service, reviews }: ServiceReviewsProps) {
  return (
    <section className="py-20 md:py-28 bg-foreground">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/30">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-emerald-400 text-emerald-400" />
              ))}
            </div>
            <span className="text-xl font-bold text-background">4.9/5</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background">
            Más de 15.000 clientes satisfechos
          </h2>
          <p className="text-lg text-background/60 max-w-2xl mx-auto">
            Opiniones verificadas de clientes reales en toda España
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-background/5 border border-background/10 hover:bg-background/10 hover:border-emerald-500/30 transition-all group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-500/20" />

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-emerald-400">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-background">{review.name}</h3>
                      {review.verified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <p className="text-sm text-background/50">{review.location}</p>
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? "fill-emerald-400 text-emerald-400" : "text-background/20"}`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-background/70 leading-relaxed mb-4">{review.text || review.comment}</p>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm pt-4 border-t border-background/10">
                <span className="text-emerald-400 font-medium">{review.service}</span>
                {review.date && (
                  <div className="flex items-center gap-1 text-background/40">
                    <Clock className="w-3 h-3" />
                    <span>{review.date}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-background mb-2">15.247</div>
            <div className="text-background/50">Servicios realizados</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-background/10" />
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-emerald-400 mb-2">98%</div>
            <div className="text-background/50">Satisfacción</div>
          </div>
          <div className="hidden sm:block w-px h-16 bg-background/10" />
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-background mb-2">24min</div>
            <div className="text-background/50">Tiempo medio</div>
          </div>
        </div>
      </div>
    </section>
  )
}
