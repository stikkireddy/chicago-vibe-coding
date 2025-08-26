sync-app:
	@echo "🔄 Syncing application files to Databricks workspace..."
	cd app && databricks sync . /Workspace/Users/sri.tikkireddy@databricks.com/sri-chicago-vibe-coding-app
	@echo "✅ Sync completed successfully!"

deploy-app: sync-app
	@echo "🚀 Deploying application to Databricks..."
	databricks apps deploy sri-chicago-vibe-coding-app --source-code-path /Workspace/Users/sri.tikkireddy@databricks.com/sri-chicago-vibe-coding-app
	@echo "✅ Deployment completed successfully!"

app-details:
	@echo "🔍 Getting application details..."
	databricks apps get sri-chicago-vibe-coding-app
	@echo "✅ Application details retrieved successfully!"

list-deployments:
	@echo "🔍 Listing deployments..."
	databricks apps list-deployments sri-chicago-vibe-coding-app
	@echo "✅ Deployments listed successfully!"

local:
	@echo "🔄 Starting local development server..."
	cd app && npm run dev
	@echo "✅ Local development server started successfully!"

db-generate:
	@echo "🔄 Generating database migrations..."
	cd app && npx drizzle-kit generate
	@echo "✅ Database migrations generated successfully!"

db-migrate:
	@echo "🚀 Running database migrations..."
	cd app && npx drizzle-kit migrate
	@echo "✅ Database migrations completed successfully!"

db-setup: db-generate db-migrate
	@echo "✅ Database setup completed successfully!"

.PHONY: sync-app deploy-app app-details list-deployments local db-generate db-migrate db-setup