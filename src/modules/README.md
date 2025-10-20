# Modules Architecture

This directory contains the micro-frontend modules for scalability and modularity.

## Structure

- **shared**: Shared components, utilities, and types used across modules
- **feature-a**: Example feature module with isolated components and logic
- **feature-b**: Example feature module with isolated components and logic

Each module can be developed, tested, and deployed independently following micro-frontend principles.

## Module Guidelines

1. Each module should be self-contained with its own components, hooks, and utilities
2. Shared code should be placed in the `shared` module
3. Inter-module communication should be through well-defined interfaces
4. Each module can have its own routing, state management, and API layer
