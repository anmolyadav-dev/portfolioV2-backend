export const submitContactForm = async (req,res) => {
    const {name , email , subject , message } = req.body;

    if (!name || !email || !subject || !message ){
        return res.status(400).json({
            error: 'Missing required fields'
        })
    }

    // send that message to discord 
    try {
        const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            embeds: [
                {
                title: `📬 ${subject}`,
                color: 0xdc2626,
                fields: [
                    { name: 'Name', value: name, inline: true },
                    { name: 'Email', value: email, inline: true },
                    { name: 'Message', value: message.slice(0, 1024) },
                ],
                footer: { text: 'Portfolio Contact Form' },
                },
            ],
        })
        
        })

        if (!response.ok) {
            throw new Error('Discord webhook failed');
        }

        return res.status(200).json({message:"Message sent successfully"})
    } catch (error) {
        return res.status(500).json({
            error: 'Failed to send message',
        });
    }
    
}