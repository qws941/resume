# AI WORKFLOW AGENTS (\_bmad)

**Reason:** Unique AI workflow system sharding logic into atomic state transitions.

## OVERVIEW

Step-file AI Workflow System. Disciplined execution via discrete, JIT-loaded markdown state machines.

## STRUCTURE

- `bmm/`: Mental Models. Project lifecycle and business logic orchestration.
- `bmgd/`: Game Design. Creative, narrative, and mechanics definitions.
- `bmb/`: Builder. Implementation, code generation, and workflow expansion.
- `core/`: Shared master agents and common toolsets.
- `_config/`: Global system prompts and model manifests.
- `_memory/`: Persistent cross-session context storage.

## WHERE TO LOOK

- `*/workflows/**/instructions.md`: Primary workflow logic and step definitions.
- `*/workflows/**/workflow.yaml`: Metadata and configuration for steps.
- `*/agents/*.md`: Persona and behavioral definitions.
- `*/teams/*.yaml`: Multi-agent swarm patterns.

## CONVENTIONS

- **Step-File Architecture**: Workflows sharded into micro-files for state control.
- **JIT Loading**: Only current step context in memory. Prevents drift.
- **Risk Governance**: Mandatory verification gates between transitions.
- **Menu-Driven**: Halt at `[Menu]` for explicit user/agent routing.
- **Append-Only**: Documents built incrementally to maintain history.

## ANTI-PATTERNS

- **Time Estimates**: **ABSOLUTELY NO** time predictions (hours, days).
- **Context Overload**: Loading multiple step files simultaneously.
- **Silent Progression**: Advancing without confirming step output.
- **Implicit State**: Relying on conversation history instead of `_memory/`.

**Status:** Production (v6.0 Modular)
