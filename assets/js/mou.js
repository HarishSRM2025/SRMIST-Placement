const new_activities = document.getElementById('new_activities');
const activity_content=[
    {
        title:"Title-1",
    },
    {
        title:"Title-2",
    },
    {
        title:"Title-3",
    }
]
activity_content.map((e,i)=>{
    new_activities.innerHTML+=
    `<div class="collab-card">
        <div class="img">
            <img src="./assets/images/collaboration/${i+1}.png" alt="">
        </div>
    </div>`
})
    
