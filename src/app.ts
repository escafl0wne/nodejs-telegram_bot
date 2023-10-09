import { Telegraf,session } from "telegraf";
import { TConfigService } from "./config/config.interface";
import { ConfigService } from "./config/config.service";
import { TBotContext } from "./context/context.type";
import { Command } from "./commands/command.class";
import LocalSession from "telegraf-session-local";
import { StartCommand } from "./commands/start.command";

class Bot{
    bot:Telegraf<TBotContext>
    commands:Command[] = []
    constructor(private readonly configService:TConfigService){
        this.bot = new Telegraf<TBotContext>(this.configService.get("TOKEN"));
        this.bot.use(new LocalSession({database:'./session.json'})).middleware()
    }
    init(){
        this.commands = [new StartCommand(this.bot)]
    
        for(const command of this.commands){
            command.handle()
        
        }
        this.bot.launch()
    }
}


const bot = new Bot(new ConfigService());
bot.init()