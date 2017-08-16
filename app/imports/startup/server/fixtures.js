import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Groups } from '../../api/groups/groups.js';
import { Statuses } from '../../api/statuses/statuses.js';

Meteor.startup(()=>{
    if(Meteor.users.find().count() === 0) {
        const users = [
            {
                username: 'zak',
                email: 'zaklampert@gmail.com',
                password: 'password',
                groupName: 'zaks-group',
                statuses: [
                    {
                        "sourceUrl" : "https://media1.giphy.com/media/YJ5OlVLZ2QNl6/giphy.mp4",
                        "fileType" : "mp4",
                        "height" : "375",
                        "width" : "500",
                        "public" : false
    
                    },
                    {
                        "sourceUrl" : "https://media0.giphy.com/media/VkMV9TldsPd28/giphy.mp4",
                        "fileType" : "mp4",
                        "height" : "281",
                        "width" : "500",
                        "public" : false,
                    },
                    
                ]
            },
           
            {
                username: 'julianne',
                email: 'juliannelampert@gmail.com',
                password: 'password',
                groupName: 'juliannes-group',
                statuses: [
                    {
                        "sourceUrl" : "https://media0.giphy.com/media/xT1XGUxKBHHl6X3lxm/giphy.mp4",
                        "fileType" : "mp4",
                        "height" : "500",
                        "width" : "700",
                        "public" : false,
                    
                    },
                    {
                        "sourceUrl" : "https://media2.giphy.com/media/pFwRzOLfuGHok/giphy.mp4",
                        "fileType" : "mp4",
                        "height" : "312",
                        "width" : "500",
                        "public" : false,
                    }
                ]
            },
            {
                username: 'logan',
                email: 'logan@notarealemail.com',
                password: 'password',
                groupName: 'logans-group',
                statuses: [
                    {
                        "sourceUrl" : "https://media2.giphy.com/media/DgLsbUL7SG3kI/giphy.mp4",
                        "fileType" : "mp4",
                        "height" : "269",
                        "width" : "320",
                        "public" : false,
                    },
                    {
                        "sourceUrl" : "https://media2.giphy.com/media/3oriNLCq45I9mdJK1y/giphy.mp4",
                        "fileType" : "mp4",
                        "height" : "480",
                        "width" : "480",
                        "public" : false,
                    }
                ]
            },
            {
                username: 'manhart',
                email: 'manhart@notarealemail.com',
                password: 'password',
                groupName: 'manharts-group',
                statuses: [
                    {
                        "sourceUrl" : "https://media1.giphy.com/media/hKNPxrffFH0GY/giphy.mp4",
                        "fileType" : "mp4",
                        "height" : "345",
                        "width" : "386",
                        "public" : false,
                    
                    },
                    {
                        "sourceUrl" : "https://media2.giphy.com/media/TBLVbGSqA7e24/giphy.mp4",
                        "fileType" : "mp4",
                        "height" : "360",
                        "width" : "404",
                        "public" : false,
                    }
                ]
            }
        ];


        users.forEach(user => {
            const userId = Accounts.createUser({
                username: user.username,
                password: user.password,
                email: user.email,
            });
            user.statuses.forEach(status => {
                Statuses.insert(Object.assign(status, {
                    userId,
                }));
            })
        });

    }
})