# Discord-Ticket
Discord Ticket System

## Configuration

### credentials

credentials.json
``json
{
    "token": "" // Discord Bot Token
}
``

### tickets

tickets.json
``json
[
    {
        "label": "General Support",
        "description": "Tikcet for general support requests",
        "value": "general_support", // like a id
        "access_roles": [], // Discord Roles that are allowed to see and write into the ticket
        "discord_alias": "gs" // Category type alias for the discord channel
    }
    //Add more...
]
``
### config

config.json
``
{
    "setup_code": "setup_ticket",` // Sned this code into a discord channel to setup the system
    "ticket_category": "" // Ticket Catrgory where the tickets are created
}
``