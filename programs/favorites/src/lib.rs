use anchor_lang::prelude::*;

declare_id!("6RvvQNQbYxMYqzdo9qMw6RwqNqd28ZhRa4haW9tAbQzt");

#[program]
pub mod favorites {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
