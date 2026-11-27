const fs=require('fs'),vm=require('vm'),assert=require('assert');
const elements={};const el=id=>elements[id]??={value:'',innerHTML:'',textContent:'',setAttribute(name,value){this[name]=value}};
const ctx={document:{getElementById:el,querySelector:()=>({}),querySelectorAll:()=>[],documentElement:{}},console,assert};
vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/app.js','utf8'),ctx);
vm.runInContext(`assert.equal(language,'en');assert(document.getElementById('heading').textContent.includes('Overall'));assert(document.getElementById('resultRevision').innerHTML.includes('Results as of'));setLanguage('bm');`,ctx);
vm.runInContext(`
assert.equal(sports.length,9);
const expectedTotals={Overall:[98,98,116],Swimming:[31,31,31],Badminton:[5,5,5],'E-Sports':[4,4,4],Karate:[5,5,10],Archery:[14,14,14],Athletics:[22,22,22],'Lawn Bowls':[5,5,10],'Sepak Takraw':[4,4,4],'Pencak Silat':[8,8,16]};
for(const [name,expected] of Object.entries(expectedTotals)){sport=name;render();assert.equal(total().join(),expected.join(),name+' medal totals');assert.equal(visible.length,9);assert.equal(document.getElementById('download').disabled,false);}
for(let i=0;i<9;i++)for(let j=0;j<3;j++)assert.equal(sports.reduce((v,s)=>v+data[s][i][j],0),data.Overall[i][j],teams[i][0]+' reconciliation');
sport='Overall';render();assert.equal(sum(total()),312);assert.equal(visible.map(r=>r.i).join(),'0,1,2,3,5,4,6,7,8');assert.equal(sum(data.Overall[5]),15);assert.equal(overallStanding(5).rank,5);assert(document.getElementById('rows').innerHTML.includes('labuan-highlight'));
sport='Lawn Bowls';render();assert.equal(visible[0].i,5);assert.equal(visible[1].i,0);assert.equal(visible[2].i,1);
sport='Sepak Takraw';render();assert.equal(visible[0].i,0);assert.equal(visible.find(r=>r.i===3).rank,5);assert.equal(visible.find(r=>r.i===5).rank,5);
sport='Pencak Silat';render();assert.equal(visible[0].i,0);assert.equal(visible.find(r=>r.i===5).rank,4);assert(movement('Pencak Silat',5).isNew);
for(let i=0;i<9;i++){const rows=rankedSports(i).map(([,v])=>v[i]);for(let j=1;j<rows.length;j++)assert(compareMedals(rows[j-1],rows[j])<=0);}
assert.equal(rankedSports(0)[0][0],'Swimming');assert.equal(rankedSports(5)[0][0],'Lawn Bowls');
const change=movement('Overall',5);assert.equal(change.rankDelta,1);assert.equal(change.medalDelta,5);assert.equal(change.medals.join(),'1,3,1');assert(rankChange('Overall',5).includes('↑1'));assert.equal(movement('Overall',4).rankDelta,-1);assert.equal(movement('Overall',3).medals[0],-1);
sport='Overall';document.getElementById('search').value='Labuan';render();assert.equal(visible.length,1);assert.equal(visible[0].rank,5);
document.getElementById('detail').showModal=()=>{};document.getElementById('rows').onclick({target:{closest:()=>({dataset:{team:'5'}})}});assert(document.getElementById('detailRank').innerHTML.includes('#5'));assert(document.getElementById('detailSub').textContent.includes('15 jumlah pingat'));assert(document.getElementById('detailMovement').innerHTML.includes('Naik 1 kedudukan'));assert(document.getElementById('detailMovement').innerHTML.includes('+5 pingat'));
assert.equal(resultsRevision.sourceDate,'2026-11-26');assert.equal(resultsRevision.previousUpdatedAt,'2026-11-25T14:59:39Z');assert(revisionDate(resultsRevision.updatedAt).includes('12:05'));assert(document.getElementById('resultRevision').innerHTML.includes('26 November 2026'));assert(document.getElementById('resultRevision').innerHTML.includes('+83 pingat'));
const saved=data['Pencak Silat'];data['Pencak Silat']=null;sport='Pencak Silat';render();assert(document.getElementById('download').disabled);assert.equal(visible.length,0);data['Pencak Silat']=saved;
assert.equal(teamLabel(5),'MAS C - F.T. LABUAN');assert.equal(teamLabel(6),'BRUNEI DARUSSALAM');
`,ctx);
console.log('Passed: 312 medals, nine sport totals, nine team reconciliations, ranks/ties, Labuan #5 and +5 medals, corrected gold, source date and comparison history.');

vm.runInContext(`sport='Overall';document.getElementById('search').value='';render();for(const medal of ['🥇','🥈','🥉'])assert(document.getElementById('rows').innerHTML.includes(medal));assert(document.getElementById('rows').innerHTML.includes('labuan-highlight'));assert.equal(rankDisplay(5),'5');assert(rankDisplay(1).includes('Kedudukan 1'));assert.equal(resultsRevision.updatedAt,'2026-11-27T04:05:11Z');`,ctx);assert(fs.readFileSync('dist/index.html','utf8').includes('Kejohanan Tamat'));console.log('Passed: completed status, podium medals and retained Labuan highlight.');
vm.runInContext(`
const originalMedals=JSON.stringify(data),originalRevision=JSON.stringify(resultsRevision);
const staticNode={dataset:{en:'Tournament Completed',bm:'Kejohanan Tamat'},textContent:''};
document.querySelectorAll=selector=>selector==='[data-en]'?[staticNode]:[];
setLanguage('en');assert.equal(document.documentElement.lang,'en');assert.equal(document.getElementById('langEN')['aria-pressed'],'true');assert.equal(staticNode.textContent,'Tournament Completed');assert.equal(document.getElementById('search').placeholder,'Search delegations…');
assert(document.getElementById('detailMovement').innerHTML.includes('Up 1 place'));
sport='Swimming';render();assert.equal(document.getElementById('heading').textContent,'Swimming medal tally');
setLanguage('bm');assert.equal(document.documentElement.lang,'ms');assert.equal(staticNode.textContent,'Kejohanan Tamat');assert.equal(document.getElementById('search').placeholder,'Cari pasukan…');assert.equal(document.getElementById('heading').textContent,'Renang kedudukan pingat');assert.equal(sport,'Swimming');
assert(document.getElementById('tabs').innerHTML.includes('data-sport="E-Sports"'));assert(document.getElementById('tabs').innerHTML.includes('>E-Sukan</button>'));assert(document.getElementById('tabs').innerHTML.includes('assets/e-sports.svg'));
assert(document.getElementById('detailMovement').innerHTML.includes('Naik 1 kedudukan'));assert(document.getElementById('detailSub').textContent.includes('15 jumlah pingat'));
setLanguage('en');assert.equal(document.getElementById('heading').textContent,'Swimming medal tally');assert(document.getElementById('detailSub').textContent.includes('15 total medals'));assert.equal(JSON.stringify(data),originalMedals);assert.equal(JSON.stringify(resultsRevision),originalRevision);
sport='Overall';render();assert(document.getElementById('rows').innerHTML.includes('labuan-highlight'));assert(document.getElementById('rows').innerHTML.includes('🥇'));assert.equal(translate('1 kedudukan'),'1 place');
`,ctx);
console.log('Passed: default EN, BM/EN switching, static labels, open popup translation, stable sport identifiers, unchanged medals and Labuan highlight.');
