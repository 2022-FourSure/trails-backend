

let index = (req, res) => {
    res.send('Index')
}

let showNewTrailForm = (req, res) => {
    res.send('Create New Trail Form')
}

let create = (req, res) => {
    res.send('Create New Trail')
}

let show = (req, res) => {
    res.send('Show Details Page')
}

let showEditTrailForm = (req, res) => {
    res.send('Show Edit Trail Form')
}

let update = (req, res) => {
    res.send('Update Trail')
}

let deleteTrail = (req, res) => {
    res.send('Trail Deleted')
}

module.exports = {
    index,
    showNewTrailForm,
    create,
    show,
    showEditTrailForm,
    update,
    deleteTrail
}