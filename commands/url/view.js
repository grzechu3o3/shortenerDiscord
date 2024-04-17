const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
let {url_api} = require('./../../jd.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('view')
		.setDescription('shows the base url after entering shortened one')
        .addStringOption(option => 
        option
            .setName('link')
            .setDescription('link to shorten')
            .setRequired(true)),
    async execute(interaction) {
        const link = interaction.options.getString('link');
        const temp = link.split('/');
        const short_code = temp[temp.length - 1];
        
        let r_url = `https://api.waa.ai/v2/links/${short_code}`;

        let base_url = await axios.get(r_url);

        let img = await axios.get("https://api.waifu.pics/sfw/neko");

        let org = base_url.data.data.long_url;
        let date = base_url.data.data.created_at;
        let clicks = base_url.data.data.clicks;

        const embed = new EmbedBuilder()
                .setColor(0xFF69B4)
                .addFields(
                    {name: "Here is original link~", value: org},
                    {name: "Created at: ", value: date},
                    {name: "Clicks:", value: clicks.toString()},
                )
                .setImage(`${img.data.url}`)
                .setTimestamp()
                .setFooter({text: `( Φ ω Φ ) ${link}`, iconURL: interaction.user.displayAvatarURL({format: 'png', dynamic: true, size: 256})})
            await interaction.reply({
                embeds: [embed]
           });
	},
};