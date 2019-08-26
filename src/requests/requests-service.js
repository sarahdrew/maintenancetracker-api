//this is the file to store RequestsService object and put methods on the object that stores the transactions

const RequestsService = {
    getAllRequests(knex) {
        return knex.select('*').from('maintenacetracker_requests')
    },
    insertRequest(knex, newRequest) {
        return knex
            .insert(newRequest)
            .into('maintenacetracker_requests')
            .returning('*')
            .then(rows => {
                return rows[0]
            })

    },
    getById(knex, id) {
        return knex.from('maintenacetracker_requests')
            .select('*')
            .where('id', id).first()
    },
    deleteRequest(knex, id) {
        return knex('maintenacetracker_requests')
            .where({ id })
            .delete()
    },
    updateRequest(knex, id, newRequestFields) {
        return knex('maintenacetracker_requests')
            .where({ id })
            .update(newRequestFields)
    }
}
module.exports = RequestsService