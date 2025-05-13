export const samepleChats = [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Doe",
      _id: "1",
      groupChat: false,
      group: 1,
      members: ["1", "2"],
    },
  
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Monishka",
      _id: "2",
      groupChat: true,
      members: ["1", "2"],
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Annu Sharma",
      _id: "3",
      groupChat: true,
      members: ["1", "2"],
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Komal Pandey",
      _id: "4",
      groupChat: true,
      members: ["1", "2"],
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Kusum ",
      _id: "5",
      groupChat: true,
      members: ["1", "2"],
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Shubham",
      _id: "6",
      groupChat: true,
      members: ["1", "2"],
    },
    
  ];
  
  export const sampleUsers = [
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Aman",
      _id: "1",
    },
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Dhruv",
      _id: "2",
    },
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Prashant",
      _id: "3",
    },
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Sonali",
      _id: "4",
    },
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Devika",
      _id: "5",
    },
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Swayam",
      _id: "6",
    },
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Shruti",
      _id: "7",
    },
    {
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      name: "Naman",
      _id: "8",
    },
  ];
  
  export const sampleNotifications = [
    {
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Ridhima",
      },
      _id: "1",
    },
    {
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Neelam",
      },
      _id: "2",
    },
  ];
  
  export const sampleMessage = [
    {
      attachments: [{
        public_id: "asdsad 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },],
      content: "Hi Monishka",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        _id: "sfnsdjkfsdnfkjsbnd",
        name: "Annu ",
      },
      chat: "chatId",
      createdAt: "2025-01-11T15:25:30+05:30",
    },
  
    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "Hey Annu",
      _id: "sfnsdjkfsdnfkdddjsbnd",
      sender: {
        _id: "sfdfsdfsdf",
        name: "Annu Sharma",
      },
      chat: "chatId",
      createdAt: "2025-01-11T15:25:17+05:30",
    },
  ];
  
  export const dashboardData = {
    users: [
      {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        _id: "1",
        username: "john_doe",
        friends: 20,
        groups: 5,
      },
      {
        name: "John Boi",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        _id: "2",
        username: "john_boi",
        friends: 20,
        groups: 25,
      },
    ],
  
    chats: [
      {
        name: "LabadBass Group",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "1",
        groupChat: false,
        members: [
          { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
          { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        ],
        totalMembers: 2,
        totalMessages: 20,
        creator: {
          name: "John Doe",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
      },
      {
        name: "L*Da Luston Group",
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        _id: "2",
        groupChat: true,
        members: [
          { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
          { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        ],
        totalMembers: 2,
        totalMessages: 20,
        creator: {
          name: "John Boi",
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
        },
      },
    ],
  
    messages: [
      {
        attachments: [],
        content: "L*uda ka Message hai",
        _id: "sfnsdjkfsdnfkjsbnd",
        sender: {
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          name: "Chaman ",
        },
        chat: "chatId",
        groupChat: false,
        createdAt: "2024-02-12T10:41:30.630Z",
      },
  
      {
        attachments: [
          {
            public_id: "asdsad 2",
            url: "https://www.w3schools.com/howto/img_avatar.png",
          },
        ],
        content: "",
        _id: "sfnsdjkfsdnfkdddjsbnd",
        sender: {
          avatar: "https://www.w3schools.com/howto/img_avatar.png",
          name: "Chaman  2",
        },
        chat: "chatId",
        groupChat: true,
        createdAt: "2024-02-12T10:41:30.630Z",
      },
    ],
  };