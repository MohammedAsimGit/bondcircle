import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    console.log('Seeding database...');
    // Clean existing data
    await prisma.reminder.deleteMany();
    await prisma.memoryParticipant.deleteMany();
    await prisma.memory.deleteMany();
    await prisma.session.deleteMany();
    await prisma.friendship.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
    // Create users
    const user1 = await prisma.user.create({
        data: {
            email: 'alice@example.com',
            passwordHash: '$2b$10$placeholder_hash_for_development',
            status: 'ACTIVE',
            emailVerified: new Date(),
            profile: {
                create: {
                    username: 'alice',
                    firstName: 'Alice',
                    lastName: 'Johnson',
                    bio: 'Memory keeper and friend enthusiast',
                    timezone: 'America/New_York',
                    locale: 'en',
                },
            },
        },
    });
    const user2 = await prisma.user.create({
        data: {
            email: 'bob@example.com',
            passwordHash: '$2b$10$placeholder_hash_for_development',
            status: 'ACTIVE',
            emailVerified: new Date(),
            profile: {
                create: {
                    username: 'bob',
                    firstName: 'Bob',
                    lastName: 'Smith',
                    bio: 'Creating memories with friends',
                    timezone: 'America/Los_Angeles',
                    locale: 'en',
                },
            },
        },
    });
    const user3 = await prisma.user.create({
        data: {
            email: 'carol@example.com',
            passwordHash: '$2b$10$placeholder_hash_for_development',
            status: 'ACTIVE',
            profile: {
                create: {
                    username: 'carol',
                    firstName: 'Carol',
                    lastName: 'Williams',
                    timezone: 'Europe/London',
                    locale: 'en',
                },
            },
        },
    });
    console.log(`Created users: ${user1.id}, ${user2.id}, ${user3.id}`);
    // Create friendships
    const friendship1 = await prisma.friendship.create({
        data: {
            userId: user1.id,
            friendId: user2.id,
            status: 'ACCEPTED',
        },
    });
    const friendship2 = await prisma.friendship.create({
        data: {
            userId: user1.id,
            friendId: user3.id,
            status: 'PENDING',
        },
    });
    console.log(`Created friendships: ${friendship1.id}, ${friendship2.id}`);
    // Create memories
    const memory1 = await prisma.memory.create({
        data: {
            creatorId: user1.id,
            title: 'Coffee catch-up with Bob',
            content: 'Had a great time catching up with Bob at the new cafe downtown. We talked about old times and made plans for next weekend.',
            memoryDate: new Date('2026-07-15'),
            location: 'Downtown Cafe',
            visibility: 'FRIENDS',
        },
    });
    const memory2 = await prisma.memory.create({
        data: {
            creatorId: user2.id,
            title: 'Beach day',
            content: 'Perfect day at the beach with friends. The sunset was incredible.',
            memoryDate: new Date('2026-07-20'),
            location: 'Sunset Beach',
            visibility: 'PUBLIC',
        },
    });
    console.log(`Created memories: ${memory1.id}, ${memory2.id}`);
    // Create memory participants
    await prisma.memoryParticipant.createMany({
        data: [
            { memoryId: memory1.id, userId: user1.id, role: 'CREATOR' },
            { memoryId: memory1.id, userId: user2.id, role: 'PARTICIPANT' },
            { memoryId: memory2.id, userId: user2.id, role: 'CREATOR' },
            { memoryId: memory2.id, userId: user1.id, role: 'PARTICIPANT' },
        ],
    });
    console.log('Created memory participants');
    // Create reminders
    const reminder1 = await prisma.reminder.create({
        data: {
            memoryId: memory1.id,
            userId: user1.id,
            remindAt: new Date('2026-08-15'),
            status: 'PENDING',
        },
    });
    console.log(`Created reminder: ${reminder1.id}`);
    // Create session
    const session1 = await prisma.session.create({
        data: {
            userId: user1.id,
            token: 'dev-session-token-alice-' + Date.now(),
            ipAddress: '127.0.0.1',
            userAgent: 'Development Environment',
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
    });
    console.log(`Created session: ${session1.id}`);
    console.log('Database seeded successfully!');
}
main()
    .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map