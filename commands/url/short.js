const {SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');
let url_api = process.env.url_api


module.exports = {
	data: new SlashCommandBuilder()
		.setName('short')
		.setDescription('shortens url')
        .addStringOption(option => 
        option
            .setName('link')
            .setDescription('link to shorten')
            .setRequired(true))
        .addBooleanOption(option => 
            option
                .setName('private')
                .setDescription('true = longer url, harder to guess, false = shorter url, easy to guess')
        ),
	async execute(interaction) {
		let url = interaction.options.getString('link');
        let priv = interaction.options.getBoolean('private');

        let headers = {
            'Authorization': `API-Key ${url_api}`,
            'Content-Type': 'application/json'
        }
        let postData = {url: url, private: priv}

        const r_url = "https://api.waa.ai/v2/links";

        let shortened;
        //todo: usuwanie linku ok

        await axios.post(r_url, postData, {headers})
            .then(response => {
                shortened = response.data.data.link;
            })
            .catch(error => {console.error(error);});

            let img = await axios.get("https://api.waifu.pics/sfw/neko");
            
            const embed = new EmbedBuilder()
                .setColor(0xFF69B4)
                .addFields(
                    {name: "Here is your link~", value: shortened}
                )
                .setImage(`${img.data.url}`)
                .setTimestamp()
                .setFooter({text: '( Φ ω Φ )', iconURL: interaction.user.displayAvatarURL({format: 'png', dynamic: true, size: 256})})
            await interaction.reply({
                embeds: [embed]
           });
	},
};
