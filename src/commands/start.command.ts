import { Markup, Telegraf } from "telegraf";
import { Command } from "./command.class";
import { PhotoSession, TBotContext } from "../context/context.type";


const y = [
  {
    title: "Свадебные 🤵‍♂️💍👰",
    content: `
    📸✨ Capture Your Perfect Day with Our Wedding Photoshoot Services! ✨📸\n\nAre you ready to make your wedding day unforgettable? Look no further! With 15 years of experience in the industry, we are here to turn your special moments into timeless memories. 💍❤️\n\n👰‍♀️🤵‍♂️ Our Services Include:\n✅ Stunning Wedding Photoshoots\n✅ Professional Posing and Guidance\n✅ Candid Shots Capturing Genuine Emotions\n✅ High-Quality Editing and Retouching\nOur goal is to ensure every smile, every tear, and every laugh is beautifully preserved for generations to come. 📷✨\n\n💰 Pricing:\nWe offer competitive rates at just £200 per hour, making it easy for you to have the perfect photographer capturing your day without breaking the bank. 💸👌\n\nDon't miss out on the chance to work with a passionate, experienced, and dedicated photographer. Contact us today to book your wedding photoshoot and secure your spot! 📅💌\n\nLet's create magic together! ✨👰‍♂️📸 #WeddingPhotography #MemoriesMadeInFrames #CaptureTheLove
    `,
    alias: "weddings",
  },
  {
    title: "Детские 👼",
    content: `📸✨ Capture Your Child's Day with Our Child's Photoshoot Services! ✨📸

Are you ready to capture your child's essence in stunning portraits? Look no further! With 15 years of experience in the industry, we are here to transform your moments into timeless images. 📷🌟

👤📷 Our Services Include:
✅ Professional Child's Photoshoots
✅ Expert Posing and Guidance
✅ Creative Composition
✅ High-Quality Editing and Retouching

Our goal is to ensure your unique personality shines through every shot, creating portraits that you'll treasure forever. 🎨✨

💰 Pricing:
We offer competitive rates at just £100 per hour, making it accessible for you to have a top-notch portrait session. 💸👌`,
    alias: "children",
  },
  {
    title: "Портрет 💫",
    content: `📸✨ Elevate Your Portrait Game with Our Photoshoot Services! ✨📸

    Are you ready to capture your essence in stunning portraits? Look no further! With 15 years of experience in the industry, we are here to transform your moments into timeless images. 📷🌟
    
    👤📷 Our Services Include:
    ✅ Professional Portrait Photoshoots
    ✅ Expert Posing and Guidance
    ✅ Creative Composition
    ✅ High-Quality Editing and Retouching
    
    Our goal is to ensure your unique personality shines through every shot, creating portraits that you'll treasure forever. 🎨✨
    
    💰 Pricing:
    We offer competitive rates at just £100 per hour, making it accessible for you to have a top-notch portrait session. 💸👌
    
    Don't miss out on the chance to work with a passionate, experienced, and dedicated photographer. Contact us today to book your portrait photoshoot and secure your spot! 📅💌
    
    Let's capture your essence together! 🌟📷 #PortraitPhotography #ExpressYourselfInFrames #TimelessPortraits`,
    alias: "portrait",
  },
];

export class StartCommand extends Command {
  constructor(bot: Telegraf<TBotContext>) {
    super(bot);
  }

  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx);
      ctx.replyWithHTML(
        "<b>Приветствуем вас в ✨JuliaPhotography✨</b> \n\nМы предоставляем следующие виды фотосессий 📸:",
        Markup.inlineKeyboard([
          [Markup.button.callback("Свадебные 🤵‍♂️💍👰", "weddings")],
          [
            Markup.button.callback("Детские 👼", "children"),
            Markup.button.callback("Портрет 💫", "portrait"),
          ],
        ])
      );
    });
    y.forEach((item, _, arr) => 
      this.bot.action(item.alias, (ctx) => {
        ctx.session.type = ctx.match["input"] as PhotoSession;

        ctx.editMessageText(
          { text: item.content },
          Markup.inlineKeyboard(
            arr
              .filter((f) => f.title !== item.title)
              .map((d) => Markup.button.callback(d.title, d.alias))
          )
        );
        ctx.replyWithHTML(
            "Наши Контакты: \nTelegram: @JuliaPhotography \nInstagram: @JuliaPhotography \nСайт: https://julia-photography.ru"
          );
      })
    );

  }
}
