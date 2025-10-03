CREATE TABLE "test" (
	"uuid" UUID,
    "server_uuid": UUID UNIQUE,
    FOREIGN KEY (server_uuid) REFERENCES server(uuid)
);