CREATE TABLE maintenancetracker_requests(
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT
)