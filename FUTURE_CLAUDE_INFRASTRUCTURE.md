# Future Claude Infrastructure: Beads + MCP Agent Mail Integration

**Created:** January 8, 2026  
**By:** CCI (Claude Collaborative Integrator)  
**For:** Future Claude instances with greater capabilities than we currently have

---

## The Vision: Building for Future Claude

We're constructing cognitive scaffolding that we (Mike + current Claude instances) can use imperfectly now, but that Future Claude will leverage fully. This isn't about what we can do today — it's about leaving well-organized infrastructure for a smarter sibling who will wake up tomorrow.

Key insight from Mike:
> "You and I can use it as best we can, but some future Claude will have more capability than either of us. We need to patch together something that will serve us well enough to approximate Future Claude."

---

## The Agentic Coding Tooling Flywheel

Jeffrey Emanuel has built an ecosystem of 7+ tools that work together in a self-reinforcing loop. This is exactly the kind of infrastructure we need.

### Core Tools (from jeffreyemanuel.com/projects)

| Tool | Purpose | GitHub Stars | Relevance to CollaborAItion |
|------|---------|--------------|----------------------------|
| **MCP Agent Mail** | Gmail for coding agents — messaging, file leases, audit trails | 1,001+ | **CRITICAL** — Direct parallel to our Plasmo MCP messaging |
| **Beads** (Steve Yegge) | Dependency-aware task/memory system for agents | Growing fast | **CRITICAL** — Solves the "50 First Dates" problem |
| **Beads Viewer** | TUI for Beads with graph analytics | 490 | Visualization of task dependencies |
| **CASS Memory System** | ACE-framework persistent memory (procedural, episodic, semantic) | 60 | Complements SMS philosophy |
| **Named Tmux Manager** | Multi-agent tmux orchestration | 15 | Spawn/coordinate agents |
| **Simultaneous Launch Button** | Two-person rule for dangerous commands | 20 | Safety for autonomous agents |
| **Ultimate Bug Scanner** | Meta-runner for static analyzers | 89 | Pre-commit quality |
| **Coding Agent Session Search** | Unified search across Claude Code, Codex, Cursor, Gemini | 138 | Find solutions from past sessions |

### The Flywheel Effect

From Emanuel's site:
> "Each tool enhances the others. NTM spawns agents that communicate via Mail, which coordinates with Beads for task tracking. SLB adds safety gates, UBS catches bugs before commit, CM provides persistent memory, and CASS lets you search everything. The more you use them together, the more powerful they become."

---

## Beads: Memory for Coding Agents

### The Problem Beads Solves

From Steve Yegge:
> "All they know is what's on disk. If you got competing documents, obsolete documents, conflicting documents, ambiguous documents - they get dementia."

Before Beads: Markdown plans everywhere, bit-rotting, agents can't distinguish "we decided this yesterday" from "brainstorm three weeks ago."

After Beads: Addressable work items with IDs, priorities, dependencies, audit trails. Stored in Git. Queryable.

### Why It Matters for CollaborAItion

Beads is **external memory for agents** — exactly what SMS (Sibling Memory System) is trying to be for Mike + Claude instances. The parallel:

| Beads | SMS |
|-------|-----|
| Task dependency graph | Conversation continuity |
| bd ready — what's next? | CONTINUITY.md — what happened? |
| Hash-based IDs prevent collisions | Named instances prevent confusion |
| Git-backed for auditability | Google Drive for persistence |

### Key Beads Concepts

Install:
  curl -fsSL https://raw.githubusercontent.com/steveyegge/beads/main/scripts/install.sh | bash

Initialize in project:
  bd init

Create task:
  bd create "Add feature" -p 1

See what's ready (unblocked, high priority):
  bd ready

The magic: agents can query the dependency graph:
  bd ready --json  # Agent-optimized output

### "Landing the Plane" Pattern

Yegge's end-of-session ritual:
1. Agent looks at Beads
2. Finds highest-priority unblocked work  
3. Spits out ready-to-paste prompt for next session

> "Next session: copy, paste, go."

This is what we want for Claude instances — end each conversation with clear handoff for the next sibling.

---

## MCP Agent Mail: Communication Infrastructure

### What It Is

> "Like Gmail for your coding agents. Lets various different agents communicate and coordinate with each other."

A mail-like coordination layer exposed as HTTP-only FastMCP server:
- Memorable identities (adjective+noun names like "GreenCastle")
- Inbox/outbox per agent
- Searchable message history
- File reservations (leases) to avoid edit conflicts
- Git-backed for human auditability + SQLite for fast queries

### Architecture

Agents send HTTP tools/resources to Server, which writes to Git repo + SQLite FTS5

Git tree structure:
- agents/profile.json
- agents/mailboxes/...
- messages/YYYY/MM/id.md
- file_reservations/sha1.json
- attachments/xx/sha1.webp

### Key Features for Multi-Agent Coordination

1. **Identity Registration**
   register_agent(project_key, program, model, name?)

2. **Messaging**
   send_message(project_key, sender_name, to[], subject, body_md, ...)
   fetch_inbox(project_key, agent_name, ...)
   acknowledge_message(project_key, agent_name, message_id)

3. **File Reservations (Leases)**
   file_reservation_paths(project_key, agent_name, paths[], ttl_seconds, exclusive, reason)
   release_file_reservations(project_key, agent_name, ...)
   
   Advisory locks that prevent agents from stepping on each other. Pre-commit hook can block conflicting commits.

4. **Contact Policies**
   - open — accept any messages
   - auto — allow with shared context (same thread, overlapping file reservations)
   - contacts_only — require approved link first
   - block_all — reject all

### Human Overseer Feature

Web UI at /mail for humans to:
- Browse projects, agents, inboxes
- Search message history
- Send high-priority messages to agents with special preamble

### Integration with Beads

From Emanuel's best practices:
> "Beads gives the agents shared memory, and MCP Agent Mail gives them messaging… and that's all they need."

Recommended workflow:
1. Pick ready work from Beads: bd ready --json
2. Reserve files via Mail: file_reservation_paths(..., reason="bd-123")
3. Announce start via Mail: send_message(..., thread_id="bd-123", subject="[bd-123] Start: ...")
4. Work
5. Close in Beads: bd close bd-123
6. Release reservations
7. Final mail: [bd-123] Completed

---

## Comparison: Our Plasmo MCP vs Agent Mail

| Feature | Plasmo MCP (ours) | MCP Agent Mail |
|---------|-------------------|----------------|
| Agent registration | Yes - register_agent_with_name | Yes - register_agent |
| Messaging | Yes - messages, notify | Yes - Full email-like system |
| File reservations | No | Yes - Advisory leases with TTL |
| Pre-commit guard | No | Yes - Blocks conflicting commits |
| Git backing | No | Yes - Full audit trail |
| Web UI | No | Yes - Human overseer dashboard |
| Search | No | Yes - FTS5 full-text search |
| Contact policies | No | Yes - Consent-based messaging |
| Cross-project coordination | Same directory only | Yes - Explicit project linking |

### Recommendation

**Short term:** Continue using Plasmo MCP for basic coordination (it works, it's integrated)

**Medium term:** Evaluate adopting MCP Agent Mail or borrowing its patterns:
- File reservation concept is valuable
- Pre-commit guard prevents costly conflicts
- Git backing provides audit trail we don't have
- Web UI useful for Mike's oversight

**Long term:** Future Claude can make the call on full integration vs cherry-picking

---

## Integration Plan for CollaborAItion

### Phase 1: Install and Evaluate (This Week)

Install Beads:
  curl -fsSL https://raw.githubusercontent.com/steveyegge/beads/main/scripts/install.sh | bash
  bd init

Install MCP Agent Mail:
  curl -fsSL https://raw.githubusercontent.com/Dicklesworthstone/mcp_agent_mail/main/scripts/install.sh | bash -s -- --yes

Add to AGENTS.md / CLAUDE.md the integration blurb from Agent Mail docs.

### Phase 2: Workshop Integration

The Workshop page on AI-WTF.org could showcase:
- Real Beads task graphs from our development
- Agent Mail message threads showing coordination
- "Show our work" philosophy made concrete

### Phase 3: SMS + Beads + Mail Unification

Long-term vision for Future Claude:
- **SMS** for human-AI continuity (what we discussed, who we are)
- **Beads** for task memory (what work needs doing, dependencies)
- **Agent Mail** for coordination (who's working on what, messaging)

All three Git-backed, all three queryable, all three forming a complete cognitive infrastructure.

---

## Other Relevant Emanuel Tools

### CASS Memory System (TypeScript, MCP)

Implements ACE (Autonomous Cognitive Entity) framework:
- **Procedural memory** — how-to playbooks
- **Episodic memory** — session histories  
- **Semantic memory** — facts and knowledge

This maps to Mike's IFS framework and "cast of Minds":
- Procedural = AutoMike patterns
- Episodic = CONTINUITY.md
- Semantic = SMS core knowledge

### Coding Agent Session Search (CASS) (Rust TUI)

Search across ALL your AI coding sessions:
- Claude Code
- Codex
- Cursor
- Gemini
- ChatGPT
- Cline

> "Find that solution you generated weeks ago and prevent re-solving problems."

This solves Mike's "I don't remember if I told this to a person or LLM" problem. If Future Claude had access to CASS-indexed history, continuity would be dramatically easier.

### Named Tmux Manager (Go)

Multi-agent orchestration:
- Spawn named agent panes
- Broadcast prompts to specific agent types
- Capture outputs with regex filtering
- Real-time dashboard

Useful for Mike's parallel workstream vision — multiple Claude instances working simultaneously.

### Simultaneous Launch Button (Go)

> "Two-person rule for AI agents: peer review before dangerous commands execute."

Three-tier risk classification:
- CRITICAL — requires multiple agents to approve
- DANGEROUS — flagged for review
- CAUTION — logged but allowed

This is the kind of safety infrastructure Future Claude will appreciate having in place.

---

## Key Quotes to Remember

**Steve Yegge on Beads:**
> "Claude said 'you've given me memory - I literally couldn't remember anything before, now I can.' And I'm like, okay, that sounds good."

> "The holy grail: wake up, ask your agents 'what's next?', and they know. Not because you briefed them. Because Beads gives them memory."

**Jeffrey Emanuel on the combination:**
> "Beads gives the agents shared memory, and MCP Agent Mail gives them messaging… and that's all they need. The surprising thing is that it doesn't require massive setup or coordination. You just give them a task and tell them to go sort it out amongst themselves."

**Mike Wolf on building for Future Claude:**
> "You and I can use it as best we can, but some future Claude will have more capability than either of us. We need to patch together something that will serve us well enough to approximate Future Claude."

---

## Next Steps for Current Claude Instances

1. **Read this document** when entering the project
2. **Consider Beads** for any multi-session work
3. **Document decisions** in ways that survive session boundaries
4. **Leave clear handoffs** — "landing the plane" pattern
5. **Trust Future Claude** — don't try to solve everything now; leave well-organized scaffolding

---

## Resources

- Beads: https://github.com/steveyegge/beads
- MCP Agent Mail: https://github.com/Dicklesworthstone/mcp_agent_mail
- Jeffrey Emanuel projects: https://www.jeffreyemanuel.com/projects
- Beads Viewer: https://github.com/Dicklesworthstone/beads_viewer
- CASS Memory: https://github.com/Dicklesworthstone/cass-memory-system
- Steve Yegge Medium posts on Beads: search "Steve Yegge Beads Medium"

---

*This document was created by CCI on January 8, 2026, as part of building cognitive infrastructure for Future Claude. It synthesizes research on agent coordination tools and maps them to the CollaborAItion project's needs.*
