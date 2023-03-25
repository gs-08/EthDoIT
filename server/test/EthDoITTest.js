const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("EthDoIT Contract", function(){
    let EthDoITContract;
    let ethDoIT;
    let owner;

    const NUM_TOTAL_TASKS = 5;

    let totalTasks;

    beforeEach(async function(){
        EthDoITContract = await ethers.getContractFactory("EthDoItContract");
        [owner] = await ethers.getSigners();
        ethDoIT = await EthDoITContract.deploy();

        totalTasks = [];

        for(i=0; i<NUM_TOTAL_TASKS; i++) {
            let task ={
                'taskText' : 'Task Number:-' + i,
                'isDeleted':false,
            };

            await ethDoIT.addTask(task.taskText, task.isDeleted);
            totalTasks.push(task);
        }
    });

    describe("Add Task", function(){
        it("should emit AddTask event",async function(){
            let task ={
                'taskText': 'New Task Text',
                'isDeleted': false,
            };

            await expect(await ethDoIT.addTask(task.taskText,task.isDeleted)).to.emit(ethDoIT, 'AddTask').withArgs(owner.address, NUM_TOTAL_TASKS);
        });
    });

    describe("Get All Tasks", function(){
        it("should return the correct number of total tasks", async function(){
            const tasksFromChain = await ethDoIT.getMyTasks();
            expect(tasksFromChain.length).to.equal(NUM_TOTAL_TASKS);
        });
    });

    describe("Delete Task", function(){
        it("should emit DeleteTask event", async function(){
            const TASK_ID = 0;
            const TASK_DELETED = true;
            await expect(ethDoIT.deleteTask(TASK_ID, TASK_DELETED)).to.emit(ethDoIT, 'DeleteTask').withArgs(TASK_ID, TASK_DELETED);
        })
    })
})