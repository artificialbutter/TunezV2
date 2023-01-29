const { SlashCommand } = require('slash-create');

module.exports = class extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'bassboost',
            description: 'Toggle the bassboost filter',

            guildIDs: process.env.DISCORD_GUILD_ID ? [ process.env.DISCORD_GUILD_ID ] : undefined
        });
    }

    async run (ctx) {

        const { client } = require('..');

        await ctx.defer();
         
        // send to statcord
        const { statcord } = require('..');
        statcord.postCommand("Bassboost", ctx.user.id);

        const queue = client.player.getQueue(ctx.guildID);
        if (!queue || !queue.playing) return void ctx.sendFollowUp({ content: '❌ | No music is being played!' });
        await queue.setFilters({
            bassboost: !queue.getFiltersEnabled().includes('bassboost'),
            normalizer: !queue.getFiltersEnabled().includes('bassboost')
        });

        setTimeout(() => {
            return void ctx.sendFollowUp({ content: `🎵 | Bassboost ${queue.getFiltersEnabled().includes('bassboost') ? 'Enabled' : 'Disabled'}!` });
        }, queue.options.bufferingTimeout);
    }
};
