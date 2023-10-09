import { Context } from "telegraf";

export type PhotoSession = "wedding" | "portrait"|"children"

export type SessionData={
    type: PhotoSession,
    date: Date
}

export type TBotContext = Context &{
    session: SessionData
}