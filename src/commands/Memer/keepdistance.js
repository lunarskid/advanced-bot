const config = require('../../../config');
const wait = require('util').promisify(setTimeout);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageAttachment } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('keepdistance')
		.setDescription('Create a meme off a user\'s image or text.')
		.addStringOption(option => option.setName('text').setDescription('Text for image command').setRequired(true)),
	async execute(interaction, client) {
		let text = interaction.options.getString('text');
		await interaction.deferReply();
		client.memer.keepdistance(text).then(image => {
			const img = new MessageAttachment(image, 'keepdistance.png');
			let emb = new MessageEmbed()
				.setImage('attachment://keepdistance.png')
				.setFooter(`Meme for: ${interaction.member.user.tag}`)
				.setColor('RANDOM');
			wait(5000);
			interaction.editReply({embeds: [emb], files: [img]}).catch(e => console.log(e));
		});
	}
};

