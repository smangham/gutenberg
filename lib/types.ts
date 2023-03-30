import { Prisma } from "@prisma/client";

export type EventFull = Prisma.EventGetPayload<{
    include: { EventGroup: { include: { EventItem: true } }},
}>

export type Event = Prisma.EventGetPayload<{
}>

export type Problem = Prisma.ProblemGetPayload<{
}>

export type ProblemUpdate = Prisma.ProblemUpdateInput